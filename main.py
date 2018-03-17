#!/usr/bin/python3
import os
import sys
import operator

def main(argv):
    with open('kraken_bitcoin_euro.csv', 'r') as content_file:
        content = content_file.read()
    content = content.split('\n')
    for i in range(len(content)):
        content[i] = content[i].split(',')
    res = []
    for i in content:
        if i[0] != "Date" and float(i[4]) != 0:
            date = []
            date.append(i[0])
            date.append(float(i[4]))
            res.append(date)
    length = len(res) - 1
    while length > 0:
        if length == len(res) - 1:
            res[length][0] = res[length][1]
        else:
            res[length][0] = res[length + 1][1]
        length -= 1
#    res = reversed(res)
    for i in res:
        print(res)
                

if __name__ == '__main__':
    exit(main(sys.argv))
