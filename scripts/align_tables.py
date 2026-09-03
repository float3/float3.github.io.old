import sys


def merge_strings(left_file, right_file, separator):
    with open(left_file, "r") as left_f, open(right_file, "r") as right_f:
        left_lines = left_f.readlines()
        right_lines = right_f.readlines()

        if len(left_lines) != len(right_lines):
            print("number of lines must be the same")
            sys.exit(1)

        merged_lines = [
            f"{left_line.strip()} {separator} {right_line.strip()}"
            for left_line, right_line in zip(left_lines, right_lines)
        ]

    return merged_lines


def main():
    left_file = sys.argv[1]
    right_file = sys.argv[2]
    separator = sys.argv[3]

    merged_lines = merge_strings(left_file, right_file, separator)

    for line in merged_lines:
        print(line)


if __name__ == "__main__":
    main()
