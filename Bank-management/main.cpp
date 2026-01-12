#include <iostream>
#include <fstream>
#include <vector>
#include "account.h"

using namespace std;

vector<Account> accounts;

void saveData() {
    ofstream outFile("data.txt");
    for (auto &acc : accounts) {
        outFile << acc.getAccountNumber() << " "
                << acc.getName() << " "
                << acc.getBalance() << endl;
    }
    outFile.close();
}

void loadData() {
    ifstream inFile("data.txt");
    if (!inFile) return;

    int accNo;
    string name;
    double balance;

    while(inFile >> accNo >> name >> balance) {
        accounts.push_back(Account(accNo, name, balance));
    }

    inFile.close();
}

Account* findAccount(int accNo) {
    for (auto &acc : accounts) {
        if (acc.getAccountNumber() == accNo)
            return &acc;
    }
    return nullptr;
}

int main() {
    loadData();
    int choice;

    do {
        cout << "\n===== Bank Management System =====\n";
        cout << "1. Create Account\n";
        cout << "2. Deposit Money\n";
        cout << "3. Withdraw Money\n";
        cout << "4. View Account Details\n";
        cout << "5. Exit\n";
        cout << "Choose an option: ";
        cin >> choice;

        if(choice == 1) {
            int accNo;
            string name;
            double balance;
            cout << "Enter Account Number: "; cin >> accNo;
            cout << "Enter Name: "; cin >> name;
            cout << "Enter Initial Balance: "; cin >> balance;
            accounts.push_back(Account(accNo, name, balance));
            cout << "✅ Account Created Successfully!\n";
        }
        else if(choice == 2) {
            int accNo; double amount;
            cout << "Enter Account Number: "; cin >> accNo;
            Account* acc = findAccount(accNo);
            if(acc) {
                cout << "Enter Amount to Deposit: "; cin >> amount;
                acc->deposit(amount);
            } else cout << "❌ Account Not Found!\n";
        }
        else if(choice == 3) {
            int accNo; double amount;
            cout << "Enter Account Number: "; cin >> accNo;
            Account* acc = findAccount(accNo);
            if(acc) {
                cout << "Enter Amount to Withdraw: "; cin >> amount;
                acc->withdraw(amount);
            } else cout << "❌ Account Not Found!\n";
        }
        else if(choice == 4) {
            int accNo;
            cout << "Enter Account Number: "; cin >> accNo;
            Account* acc = findAccount(accNo);
            if(acc) acc->display();
            else cout << "❌ Account Not Found!\n";
        }
    } while(choice != 5);

    saveData();
    cout << "👋 Exiting program...\n";

    return 0;
}
