import sys
import subprocess
import os
from datetime import datetime


def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <some_value>")
        sys.exit(1)

    SOME_VALUE = ' '.join(sys.argv[1:])
    print("You entered:", SOME_VALUE)

    words = SOME_VALUE.split(' ', 2)

    for index, value in enumerate(words):
       print("S1_vec('{}')<= {}".format(index, value))

    first_word = words[0]
    print("first word:", first_word)

    second_word = words[1]
    print("second word:", second_word )
    fileCreateIfNotExistFlag = second_word
    print("file create flag:", fileCreateIfNotExistFlag)

    rest_of_words = words[2] if len(words) > 1 else ''

    file_path = first_word

    print("FILE path:", file_path)
    print("TEXT:", rest_of_words)

    if(fileCreateIfNotExistFlag == "false"):
        print("fileCreateIfNotExistFlag == false")
        try:
            # Check if the file exists by opening in read mode
            with open(file_path, "r", encoding="utf-8"):
                pass  # If the file opens successfully, it exists
        except FileNotFoundError:
            print(f"Error: The file '{file_path}' does not exist.")
            sys.exit(2)
    else:
        print("fileCreateIfNotExistFlag == true")

    try:
        # Open the file in append mode
        with open(file_path, "a", encoding="utf-8") as file:
            # Escape the text
            escaped_text = rest_of_words.encode('utf-8').decode('unicode_escape')
            # Write the escaped text followed by a newline
            file.write(escaped_text + "\n")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

    sys.exit(0)


if __name__ == "__main__":
    main()