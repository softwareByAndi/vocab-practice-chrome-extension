# vocab_practice

practice vocab during daily casual web browsing

<img width="1218" alt="Screenshot 2022-11-12 at 5 01 05 PM" src="https://user-images.githubusercontent.com/100483688/201499473-994bc1e1-c95f-4d93-849d-c9105e38cb8d.png">

## tutorial recording
https://www.loom.com/share/3d1338a9f2aa40fa94520d56859265d6


## description
- This is a chrome extension that alters web pages to practice foreign language vocabulary by replacing any vocab you know with its associated foreign word.
- to support other languages, change the language codes in the translate.js file. 
- Vocab are colored according to how often you see them: 
    - (from new -> mastered) = (red, orange, purple, dark-blue, light-blue, gray, black)

### translating sentences & nested json structure
- this extension utilizes Google Translate, but you can also input vocab manually. This was important because machine translation algorithms don't consistently translate with correct grammar, so the few incorrect translations can easily be manually adjusted by saving a new translation.
- Translations are then stored and maintained in your chrome local storage.
- Note that to use google translate, you need to update `translate.js` with your google translate api key
- I opted to store direct translations for specific sentences using a nested-structured json file, which optimizes translations of full sentences (with almost no overhead), and always ensures that the longest known translation is found
    - (i.e. the input  `I have`  should produce the output  `Tengo`  not  `Yo Tener`

### translating conjugations
- the last thing you or I want to do is manually input translations for every conjugation of a verb. So congrats! I've automated that for you. (only for English)
- But the original code created over 524 combinations. So I pruned that down to 109 commonly used conjugations.
- There are options to translate past present or future tense (note that your input should also be in past present or future tense in your native language)
```
    nouns -> 5 conjugations
    verb present tense -> 30 conjugations
    verb past tense -> 8 conjugations
    "to be" tense / future tense -> 66 conjugations
```


## screen shots

<img width="1218" alt="Screenshot 2022-11-12 at 5 01 05 PM" src="https://user-images.githubusercontent.com/100483688/201499473-994bc1e1-c95f-4d93-849d-c9105e38cb8d.png">

### recomendations

<img width="1177" alt="recomendations" src="https://user-images.githubusercontent.com/100483688/201499480-3b64c23d-e700-4adc-a293-69d87434aa45.png">

### verb

<img width="360" alt="verb" src="https://user-images.githubusercontent.com/100483688/201499484-2d950dd3-645b-4f3e-9e19-fc155cf0de92.png">

### noun

<img width="326" alt="noun" src="https://user-images.githubusercontent.com/100483688/201499487-94e61f0a-70ff-4b3f-84d3-81a8e2c3c169.png">

### to be

<img width="482" alt="to be" src="https://user-images.githubusercontent.com/100483688/201499489-7c95e06e-4c81-4961-8c12-7226414ede26.png">

### past

<img width="304" alt="past" src="https://user-images.githubusercontent.com/100483688/201499492-8ac4e61d-d783-44ac-b9e1-4d004e8e4d40.png">



