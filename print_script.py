from pathlib import Path

files = [
    r"C:\Users\HP\Documents\flowspace-web\components\Landlords",
    r"C:\Users\HP\Documents\flowspace-web\components\Navbar.tsx",
    r"C:\Users\HP\Documents\flowspace-web\components\Footer.tsx",
    r"C:\Users\HP\Documents\flowspace-web\components\Vacants",
    r"C:\Users\HP\Documents\flowspace-web\components\Tenants",
    r"C:\Users\HP\Documents\flowspace-web\components\Home\HomePage.tsx",
    r"C:\Users\HP\Documents\flowspace-web\components\Home\Hero.tsx",
    r"C:\Users\HP\Documents\flowspace-web\components\Home\About.tsx",
    r"C:\Users\HP\Documents\flowspace-web\app\page.tsx",
    r"C:\Users\HP\Documents\flowspace-web\app\layout.tsx",
    r"C:\Users\HP\Documents\flowspace-web\app\globals.css",
]


def print_file(path):
    path = Path(path)

    print("\n" + "=" * 100)
    print(f"FILE: {path}")
    print("=" * 100)

    if not path.exists():
        print("[NOT FOUND]")
        return

    if path.is_dir():
        print("[DIRECTORY]")

        # Print all files inside the directory recursively
        for child in sorted(path.rglob("*")):
            if child.is_file():
                print("\n" + "-" * 100)
                print(f"FILE: {child}")
                print("-" * 100)

                try:
                    print(child.read_text(encoding="utf-8"))
                except UnicodeDecodeError:
                    print("[Could not decode file as UTF-8]")

        return

    try:
        print(path.read_text(encoding="utf-8"))
    except UnicodeDecodeError:
        print("[Could not decode file as UTF-8]")


for file in files:
    print_file(file)

print("\n" + "=" * 100)
print("DONE")
print("=" * 100)
