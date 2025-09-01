#!/usr/bin/env python3
# 문법 체크 스크립트

with open('productv2-image-extractor.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    
backtick_count = 0
for i, line in enumerate(lines, 1):
    backtick_count += line.count('`')
    
print(f"Total backticks: {backtick_count}")
if backtick_count % 2 != 0:
    print("ERROR: Odd number of backticks - unclosed template literal!")
    
# Find unclosed template literals
in_template = False
template_start = 0
for i, line in enumerate(lines, 1):
    if '`' in line:
        count = line.count('`')
        for _ in range(count):
            if not in_template:
                in_template = True
                template_start = i
            else:
                in_template = False
                
if in_template:
    print(f"ERROR: Unclosed template literal around line {template_start}")
else:
    print("All template literals are properly closed")