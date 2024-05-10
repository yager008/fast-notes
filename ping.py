# import sys
# import json
# import struct
# import subprocess
# import os
#
# def getMessage():
#     rawLength = sys.stdin.buffer.read(4)
#     messageLength = struct.unpack("@I", rawLength)[0]
#     message = sys.stdin.buffer.read(messageLength).decode("utf-8")
#     return json.loads(message)
#
# def encodeMessage(messageContent):
#     encodedContent = json.dumps(messageContent).encode("utf-8")
#     encodedLength = struct.pack("@I", len(encodedContent))
#     return {"length": encodedLength, "content": encodedContent}
#
# def sendMessage(encodedMessage):
#     sys.stdout.buffer.write(encodedMessage["length"])
#     sys.stdout.buffer.write(encodedMessage["content"])
#     sys.stdout.buffer.flush()
#
# while True:
#     host = getMessage()
#     print(host)
#     scr = "python script.py "  # Command to execute script with host as argument
#     run_args = ["cmd", "/c", "start", "cmd.exe", "/k", scr + host]  # Start a new cmd window with the script
#
#     # Set PYTHONIOENCODING environment variable to utf-8
#     env = os.environ.copy()
#     env["PYTHONIOENCODING"] = "utf-8"
#
#     res = subprocess.run(run_args, stdout=subprocess.PIPE, env=env)
#     sendMessage(encodeMessage(str(res.returncode)))
import sys
import json
import struct
import subprocess
import os

def getMessage():
    rawLength = sys.stdin.buffer.read(4)
    messageLength = struct.unpack("@I", rawLength)[0]
    message = sys.stdin.buffer.read(messageLength).decode("utf-8")
    return json.loads(message)

def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent).encode("utf-8")
    encodedLength = struct.pack("@I", len(encodedContent))
    return {"length": encodedLength, "content": encodedContent}

def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage["length"])
    sys.stdout.buffer.write(encodedMessage["content"])
    sys.stdout.buffer.flush()

while True:
    host = getMessage()
    print(host)
    scr = "python"  # Command to execute script
    script_path = "script.py"

    # Start a new cmd window with the script
    run_args = ["cmd", "/c", "start", "cmd.exe", "/k", scr, script_path, host]
#     run_args = [scr, script_path, host]

    # Set PYTHONIOENCODING environment variable to utf-8
    env = os.environ.copy()
    env["PYTHONIOENCODING"] = "utf-8"
#     process = subprocess.Popen(run_args, stdout=subprocess.PIPE, env=env, creationflags=subprocess.CREATE_NO_WINDOW)
    process = subprocess.Popen(run_args, stdout=subprocess.PIPE, env=env, shell=True)

    res = process.wait()
    sendMessage(encodeMessage(str(res.returncode)))