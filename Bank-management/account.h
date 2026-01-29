#ifndef ACCOUNT_H
#define ACCOUNT_H

#include <string>
using namespace std;

class Account {
private:
    int accountNumber;
    string name;
    double balance;

public:
    Account() : accountNumber(0), name(""), balance(0.0) {}
    Account(int accNo, string accName, double bal);

    void deposit(double amount);
    bool withdraw(double amount);
    void display() const;
    int getAccountNumber() const;
    string getName() const;
    double getBalance() const;
};

#endif
