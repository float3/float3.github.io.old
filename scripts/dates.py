import datetime
import re
import subprocess


def main():
    git_status = subprocess.check_output(["git", "status", "--porcelain"]).decode(
        "utf-8"
    )
    changed_files = re.findall(r"^M\s+(.*\.md)", git_status, re.MULTILINE)
    for file in changed_files:
        with open(file, "r+") as f:
            content = f.read()
            updated_date = f"updated = {datetime.date.today().strftime('%Y-%m-%d')}"
            content = re.sub(r"updated = \d{4}-\d{2}-\d{2}", updated_date, content)
            f.seek(0)
            f.write(content)
            f.truncate()
        subprocess.run(["git", "add", file])


if __name__ == "__main__":
    main()
