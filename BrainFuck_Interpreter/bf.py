import sys
from argparse import ArgumentParser
from pathlib import Path


def compute_jump_table(instructions: str) -> dict[int, int]:
    """
    Computes a jump-table for associating the braces with their start and end positions.

    So for example if [ is seen at position 47 and it's ending is seen at position 80,
    the jump table will have { 47: 80, 80: 47 }, allowing either of them to know the position of the other end.
    """
    bracemap = {}
    stack = []

    for index, char in enumerate(instructions):
        if char == "[":
            stack.append(index)
        elif char == "]":
            start = stack.pop()
            bracemap[start] = index
            bracemap[index] = start

    return bracemap


def run(instructions: str):
    jump_table = compute_jump_table(instructions)

    cells = [0] * 30000
    cur_cell = 0
    pc = 0  # program counter

    while pc != len(instructions):
        command = instructions[pc]

        match command:
            case "+":
                cells[cur_cell] += 1
            case "-":
                cells[cur_cell] += 1
            case '<':
                cur_cell -= 1
            case '>':
                cur_cell += 1
            case '.':
                sys.stdout.write(chr(cells[cur_cell]))
            case ',':
                cells[cur_cell] = ord(sys.stdout.read(1))
            case '[':
                if cells[cur_cell] == 0:
                    pc = jump_table[pc]
            case ']':
                if cells[cur_cell] != 0:
                    pc = jump_table[pc]

        pc += 1


if __name__ == '__main__':
    parser = ArgumentParser(description='Interpret Brainfuck code')
    parser.add_argument('input', help='Input file')
    args = parser.parse_args()
    file = Path(args.input).read_text()
    run(file)
