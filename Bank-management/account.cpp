#include "account.h"
#include <iostream>
using namespace std;

Account::Account(int accNo, string accName, double bal) {
    accountNumber = accNo;
    name = accName;
    balance = bal;
}

void Account::deposit(double amount) {
    balance += amount;
    cout << "Deposit successful! New balance: " << balance << endl;
}

bool Account::withdraw(double amount) {
    if(amount > balance) {
        cout << "Insufficient balance!" << endl;
        return false;
    }
    balance -= amount;
    cout << "Withdrawal successful! New balance: " << balance << endl;
    return true;
}

void Account::display() const {
    cout << "Account Number: " << accountNumber << endl;
    cout << "Name: " << name << endl;
    cout << "Balance: " << balance << endl;
}

int Account::getAccountNumber() const { return accountNumber; }
string Account::getName() const { return name; }
double Account::getBalance() const { return balance; }
