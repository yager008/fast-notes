import sys
import subprocess
from datetime import datetime

def main():
    if len(sys.argv) < 2:
        print("Usage: python script.py <some_value>")
        sys.exit(1)

    SOME_VALUE = ' '.join(sys.argv[1:])
    print("You entered:", SOME_VALUE)

    current_date = datetime.now().strftime("%Y-%m-%d")
    file_path = r"E:\Obsidian Vault\\" + current_date + ".md"

    with open(file_path, "a", encoding="utf-8") as file:  # Specify encoding
        file.write(SOME_VALUE + "\n")

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
