import sys
import subprocess
import os
from datetime import datetime

# def transform_file_path(file_path):
#     transformed_path = file_path.replace("\\", "\\\\")
#     return transformed_path

def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <some_value>")
        sys.exit(1)

    SOME_VALUE = ' '.join(sys.argv[1:])
    print("You entered:", SOME_VALUE)

    words = SOME_VALUE.split(' ', 1)

    for index, value in enumerate(words):
       print("S1_vec('{}')<= {}".format(index, value))

    first_word = words[0]
#     second_word = words[1]
#     print("second word:", second_word )
    rest_of_words = words[1] if len(words) > 1 else ''

    file_path = first_word

#     fake_file_path = second_word
#     file_name = os.path.basename(fake_file_path)

#     transformed_file_path = transform_file_path(file_path)
    print("FILE path:", file_path)
#     print("FILE name:", file_name)
#     final_file_path_with_name = transformed_file_path + file_name
#     print("final FILE: ", file_path + file_name)
    print("TEXT:", rest_of_words)

#     current_date = datetime.now().strftime("%Y-%m-%d")
#     file_path = r"E:/Obsidian Vault/" + current_date + ".md"



    try:
        with open(file_path, "a", encoding="utf-8") as file:  # Specify encoding
            escaped_text = rest_of_words.encode('utf-8').decode('unicode_escape')
            file.write(escaped_text + "\n")
    except Exception as e:
        print(f"Error fucking sheet: {e}")
        sys.exit(1)

    sys.exit(0)

    # Start the batch script to close the command prompt window after 3 seconds
#     subprocess.run(["exit_cmd.bat"], stdout=subprocess.PIPE)


if __name__ == "__main__":
    main()

# import sys
# import subprocess
# from datetime import datetime
#
# def main():
#     if len(sys.argv) < 2:
#         print("Usage: python main_script.py <argument>")
#         sys.exit(1)
#
#     SOME_VALUE = ' '.join(sys.argv[1:])
#     print("You entered:", SOME_VALUE)
#
#     current_date = datetime.now().strftime("%Y-%m-%d")
#     file_path = r"E:\Obsidian Vault\\" + current_date + ".md"
#
#     with open(file_path, "a", encoding="utf-8") as file:  # Specify encoding
#         file.write(SOME_VALUE + "\n")
#
#     subprocess.Popen(["python", "script.py", SOME_VALUE])
#
#     subprocess.run(["exit_cmd.bat"], stdout=subprocess.PIPE)
#
# if __name__ == "__main__":
#     main()

# import sys
# import subprocess
# from datetime import datetime
#
# def main():
#     if len(sys.argv) < 2:
#         print("Usage: python main_script.py <argument>")
#         sys.exit(1)
#
#     SOME_VALUE = ' '.join(sys.argv[1:])
#     print("You entered:", SOME_VALUE)
#
#     current_date = datetime.now().strftime("%Y-%m-%d")
#     file_path = r"E:\Obsidian Vault\\" + current_date + ".md"
#
#     with open(file_path, "a", encoding="utf-8") as file:  # Specify encoding
#         file.write(SOME_VALUE + "\n")
#
#     if not getattr(sys, 'frozen', False):  # Running in an environment other than frozen
#         # Run script.py using Popen only if not frozen
#         subprocess.Popen(["python", "script.py", SOME_VALUE])
#
# if __name__ == "__main__":
#     main()
