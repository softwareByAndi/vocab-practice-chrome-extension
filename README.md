# vocab_practice

practice vocab during daily casual web browsing



## images
*(note, I'm missing a screenshot of the settings GUI popup)*
![alt text](https://github.com/anti-h3r0/vocab_practice/blob/main/screenshots/alpha%20testing.png)


## description
- This is a chrome extension that alters web pages to practice foreign language vocabulary by replacing any vocab you know with it's associated foreign word.
- to support other languages, change the language codes in the translate.js file. 
- Vocab are colored according to how often you see them: 
    - (from new -> mastered) = (red, orange, purple, dark-blue, light-blue, gray, black)

### translating sentences & nested json structure
- this extension utilizes Google Translate, but you can also input vocab manually. This was important because machine translation algorithms don't consistently translate with correct grammar, so the few incorrect translations can easily be manually adjusted by saving a new translation.
- Translations are then stored and maintained in your chrome local storage. 
- I opted to store direct translations for specific sentences using a nested-structured json file, which optimizes translations of full sentences (with almost no overhead), and always ensures that the longest known translation is found
    - (i.e. the input  `I have`  should produce the output  `Tengo`  not  `Yo Tener`

### translating conjugations
- the last thing you or I want to do is manually input translations for every conjugation of a verb. So congrats! I've automated that for you. (only for English)
- But the original code created over 524 combinations. So I pruned that down to 68 commonly used conjugations.
- There are options to translate past present or future tense (note that your input should also be in past present or future tense in your native language)
```
    nouns -> 5 conjugations
    present tense -> 30 conjugations
    past tense -> 8 conjugations
    future tense -> 30 conjugations
```


