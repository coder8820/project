"""
Student Result Management System (CLI)
Author: Kumail Abbas
Created: January 2026
"""

import csv
import os
from student import Student
from result import calculate_grade

FILE_NAME = "data.csv"


def initialize_file():
    """Create CSV file with headers if it does not exist."""
    if not os.path.isfile(FILE_NAME):
        with open(FILE_NAME, "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["Roll No", "Name", "Marks", "Average", "Grade"])


def add_student():
    roll_no = input("Enter Roll No: ").strip()
    name = input("Enter Student Name: ").strip()

    try:
        marks = list(map(int, input("Enter 3 marks (space separated): ").split()))
        if len(marks) != 3:
            print("Please enter exactly 3 marks.")
            return
    except ValueError:
        print("Marks must be numbers only.")
        return

    avg = round(sum(marks) / len(marks), 2)
    grade = calculate_grade(avg)

    student = Student(roll_no, name)

    with open(FILE_NAME, "a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([student.roll_no, student.name, marks, avg, grade])

    print("✅ Student record added successfully!")


def view_students():
    try:
        with open(FILE_NAME, "r") as file:
            reader = csv.reader(file)
            next(reader)  # Skip header
            print("\n--- Student Records ---")
            for row in reader:
                print(row)
    except FileNotFoundError:
        print("❌ No records found.")


def main():
    initialize_file()

    while True:
        print("\n===== Student Result Management =====")
        print("1. Add Student")
        print("2. View Students")
        print("3. Exit")

        choice = input("Choose an option: ").strip()

        if choice == "1":
            add_student()
        elif choice == "2":
            view_students()
        elif choice == "3":
            print("👋 Exiting program...")
            break
        else:
            print("❌ Invalid choice. Try again.")


if __name__ == "__main__":
    main()
