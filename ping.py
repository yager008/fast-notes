import sys
import json
import struct
import subprocess

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

# open cmd window: (error animation stop working)
# while True:
#     host = getMessage()
#     print(host)
#     scr = "python"
#     script_path = "script.py"
#     run_args = ["cmd", "/c", "start", "cmd.exe", "/k", scr, script_path, host]
#
#     res = subprocess.run(run_args, stdout=subprocess.PIPE)
#     sendMessage(encodeMessage(str(res.returncode)))

#don't open cmd window:
while True:
    host = getMessage()
    print(host)
    scr = "python"
    script_path = "script.py"
    run_args = [scr, script_path, host]

    # Run the script in the background without opening a command prompt window
    res = subprocess.Popen(run_args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
    res.communicate()  # Wait for the process to finish
    sendMessage(encodeMessage(str(res.returncode)))
