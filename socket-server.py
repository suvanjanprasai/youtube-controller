# Any http(s) server can be used, but remember to allow CORS.

import socket
import json

HOST = '127.0.0.1'
PORT = 5000
MESSAGE = "pause"

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind((HOST, PORT))
server_socket.listen(1)

def handle_client(client_socket):
    request = client_socket.recv(1024).decode('utf-8')
    if request.startswith('GET / HTTP/1.1'):
        response_data = {'message': f'{MESSAGE}'}
        response = json.dumps(response_data)
        headers = "HTTP/1.1 200 OK\nContent-Type: application/json\nAccess-Control-Allow-Origin: *\n\n"
        client_socket.sendall(headers.encode('utf-8'))
        client_socket.sendall(response.encode('utf-8'))
        client_socket.close()


client_socket, addr = server_socket.accept()
handle_client(client_socket)
server_socket.close()
