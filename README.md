# Typescript starter kit for https://codechallenge.testkontur.ru

You can get your API key here:
https://eventskbkontur.timepad.ru/event/1338592

Copy .env.example to .env and set your API key.

## CLI

To compile and send your solution run:

`node cli sandbox f10ec0ae-64ae-4086-b265-d320fc569772`

## Draft
`run` function in `src/draft.ts` using for generate draft choice

## Battle
`run` function in `src/battle.ts` using for generate next step in battle

## Vector
```
v1 = new Vector('0/1/2')
v2 = new Vector(3, 4, 5)

v1.string() // '0/1/2'
v2.string() // '3/4/5'
```