# Writing a Brainfuck Interpreter in Python

Brainfuck is a tiny language that includes only 8 simple commands. Writing an interpreter for it is easy and is often seen as a simple programming exercise.

Let’s write one in Python today.

## Reading files

First of all, I’ll write a simple base to load the file given on the command line. For this, I usually like to use Python’s builtin `ArgumentParser`:

```python
#!/usr/bin/python3
# -*- coding: utf8 -*-

import sys
from argparse import ArgumentParser
from pathlib import Path

def run(instructions: str):
    # TODO
    pass

if __name__ == "__main__":
    parser = ArgumentParser(description="Interpret Brainfuck code")
    parser.add_argument("input", help="Input file")
    args = parser.parse_args()
    file = Path(args.input).read_text()
    run(file)
```

Assuming we save the file to `bf.py` we can run it with `python bf.py file.bf` where `file.bf` is our input file to interpret.

For the rest of the post, we will focus on implementing the `run` function where we will actually execute our program.

## Executing Brainfuck

So brainfuck consists of 8 simple commands, let’s explore what they do.

The main idea in brainfuck is that we have a region of memory that is split into what’s known as cells and we have about 30,000 cells to use. Each cell is basically a number, about a byte long.

In Python, I will simply represent this as a giant list filled with zeroes initially, so we write:

```python
def run(instructions: str):
    cells = [0] * 30_000
```

This will create a list of 0 repeated 30,000 times, so we have enough elements.

Any other lines of code I show will also be inside the `run` function so I will not repeat that anymore.

Next, we need a cell pointer, a way to identify which cell we are currently operating on. So we create one and initially set it to the first cell; this is an index to the cells array:

```python
cur_cell = 0
```

Next, we also need to identify which instruction we are currently executing, basically where in the program are we currently on, which is traditionally known as a program counter or an instruction counter often abbreviated as `pc` and `ip` respectively.

```python
pc = 0
```

This will be an index to our instructions list, which as you may have noticed I kept as a string but it may as well could’ve been a list. Strings can also be indexed just fine and I kept it simple.

That’s all we need to start for now. Let’s actually start running code:

```python
while pc != len(instructions):
    # TODO
    pass
```

In this simple condition, we create a loop that keeps running until the program counter is at the end of the program, meaning there are no more instructions to be run so we stop.

Let’s fill the loop with something to do. From here on the code is to be indented inside the while loop:

```python
command = instructions[pc]
```

First, we use the `pc` to index into the instructions to get our current instruction or command, the one we have to execute now.

Next, let’s match the command and act accordingly. This is a great chance to use the match statement introduced in Python 3.10:

```python
match command:
    case "...":
        pass
    case "...":
        pass

pc += 1
```

This is how a match/case statement looks like. It has arms for each condition we check and code to execute to act on it. So let’s fill it with meaningful code and for that we have to actually start tackling the instructions available in brainfuck and what they mean.

Notice that at the end of the match we also increment our program counter so we can move on to the next instruction on the next iteration of the loop.

The first instruction is easy, it is `+` which stands for increment the current cell. So whatever cell our `cur_cell` is pointing to we have to add one to it. This is easy:

```python
case "+":
    cells[cur_cell] += 1
```

Next is also another easy one, `-` which as you could guess just does the opposite, decrement instead:

```python
case "-":
    cells[cur_cell] -= 1
```

And next, there are instructions to move the cell pointer, our `cur_cell` variable; they are `<` and `>`.

```python
case "<":
    cur_cell -= 1
case ">":
    cur_cell += 1
```

All right, we are done with 4 commands so far and those were the easy ones. Next, let’s tackle I/O or input/output.

## I/O

So how can brainfuck even print anything? I don’t see any letters; the idea is that it uses ASCII numbers. Since cells are numbers, we then have a command to take the current cell and interpret that number as an ASCII letter to print. That command is called `.`.

```python
case ".":
    sys.stdout.write(chr(cells[cur_cell]))
```

This takes the value of our current cell and passes it to `chr()` which can create a character given a number. We then write it to standard output using `sys.stdout.write`. The reason we didn’t use `print` is because it’d print a newline and brainfuck usually prints letter by letter instead of having the concept of printing a full string. If we used `print` we’d see each letter in a new line, and although `print` has arguments to disable the end character it’s easier to just directly write to the standard output like this.

By now we have something fairly usable, you can create a `test.bf` file and write in it:

```
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.
```

That is 65 characters of `+` meaning it makes the cell store the number 65 and then we interpret it as ASCII which stands for the letter `A` and print it using `.`.

So if everything is done right you can run `python bf.py test.bf` and it’ll print `A`!

Next, let’s tackle the input part of the I/O. Brainfuck has a command called `,` which is used to receive one letter of input and store it inside the current cell so we just do:

```python
case ",":
    cells[cur_cell] = ord(sys.stdin.read(1))
```

Here we used `sys.stdin.read` to read one byte worth of input from the standard input and passed it to `ord` which kind of does the opposite of `chr`. It instead takes a letter and gives us the number equivalent so we can store it in our cells.

Now with I/O done, there’s one last section left and it is the slightly harder part of this exercise.

## Jumps

The last remaining commands are `[` and `]` which play a role in jumping around the code. This is sort of like a basic while loop for brainfuck.

The way these work is that:

- `[` checks if current cell is 0, if so skip all code until the next `]`. Imagine a `while (0) {}`; the code in the braces would not run.
- `]` checks if the current cell is not 0, then it goes back to the starting pair `[`.

So this gets a little confusing as we need to keep track of positions so we can know where to jump.

Hey, how does jumping even work? That one is simple, since we have a `pc` variable pointing on where in the code we are executing, simply by changing the `pc` variable to point to another part of the code we just jumped to that part.

So for keeping track of the positions I like to do a pass on the code before we execute anything to calculate all the positions of the `[`s and `]`s and produce a jump table, a dictionary that maps each `[`s to their `]`s and likewise each `]`s to their `[`s.

For that, we have another function:

```python
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
```

Here I kept a simple stack because these `[]` pairs can nest within one another and a stack just felt the right way to properly keep track of them. Hopefully, you can understand that part.

Back to the `run` function, at the very top of it we calculate the jump table:

```python
jump_table = compute_jump_table(instructions)
```

Now it’s easy, just checking for the zero conditions as mentioned and when we need to do the jump, we just change `pc` to whatever this table maps the `pc` to, just watch:

```python
case "[":
    if cells[cur_cell] == 0:
        pc
