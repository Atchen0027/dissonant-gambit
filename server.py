#!/usr/bin/env python3
import http.server
import json
import os
import re
import socketserver
from datetime import datetime

PORT = 8088
DIR = os.path.dirname(os.path.abspath(__file__))
CODES_FILE = os.path.join(DIR, 'access_codes.json')
PACKAGE_NAME = "com.nhcoders.roge_chest"

class DissonantGambitHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def do_GET(self):
        if self.path == '/api/status':
            self.handle_status()
            return
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/claim-code':
            self.handle_claim()
            return
        self.send_error(404, "Not Found")

    def handle_status(self):
        try:
            with open(CODES_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
            resp = {
                "available": len(data.get("available", [])),
                "claimed": len(data.get("claimed", {})),
                "burned": len(data.get("burned_codes", []))
            }
            self.send_json(200, resp)
        except Exception as e:
            self.send_json(500, {"error": str(e)})

    def handle_claim(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8')
        try:
            body = json.loads(post_data)
        except Exception:
            self.send_json(400, {"success": False, "error": "JSON inválido."})
            return

        email = body.get('email', '').strip().lower()
        if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            self.send_json(400, {"success": False, "error": "Introduce un correo electrónico válido."})
            return

        try:
            with open(CODES_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)

            claimed = data.get("claimed", {})
            available = data.get("available", [])
            burned_codes = data.get("burned_codes", [])

            discard_code = body.get('discard_code', '').strip()
            if discard_code:
                if discard_code not in burned_codes:
                    burned_codes.append(discard_code)
                if discard_code in available:
                    available.remove(discard_code)

            if not available:
                self.send_json(200, {
                    "success": False,
                    "error": "¡Todas las claves de acceso anticipado gratuito han sido entregadas!",
                    "remaining": 0
                })
                return

            # Always deliver a fresh unused code from the available list
            code = available.pop(0)

            # Record in claimed history
            if email not in claimed:
                claimed[email] = []
            elif isinstance(claimed[email], dict):
                claimed[email] = [claimed[email].get("code")]

            claimed[email].append({
                "code": code,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            })

            # Save atomically (code is deleted from available list permanently)
            temp_file = CODES_FILE + '.tmp'
            with open(temp_file, 'w', encoding='utf-8') as f:
                json.dump({
                    "available": available,
                    "claimed": claimed,
                    "burned_codes": burned_codes
                }, f, indent=2)
            os.replace(temp_file, CODES_FILE)

            redeem_url = f"https://play.google.com/redeem?code={code}"
            app_direct_url = f"https://play.google.com/store/apps/details?id={PACKAGE_NAME}&code={code}"

            self.send_json(200, {
                "success": True,
                "code": code,
                "redeemUrl": redeem_url,
                "appDirectUrl": app_direct_url,
                "remaining": len(available)
            })

        except Exception as e:
            self.send_json(500, {"success": False, "error": f"Error del servidor: {str(e)}"})

    def send_json(self, status, payload):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode('utf-8'))

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), DissonantGambitHandler) as httpd:
        print(f"Dissonant Gambit server running at http://localhost:{PORT}")
        httpd.serve_forever()
