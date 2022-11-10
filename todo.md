todo

Vocab Practice
```
Note : consider doing it backwards as well. As in, taking a book written in the target language, and translating unknown words back into the native language, while adding new vocab 1-3 at a time. Slowly, fewer and fewer words are translated into English. This would be for advanced applications. Or possibly intermediate applications, depending on the difficulty of the book.

It wouldn't be as fun, but technically, you can start learning with children's books, and eventually make your way up to normal books.


when entering a <verb>, grab translations for all combinations of :
    a = | I | you | he | she | it | they | to | _ |
    b = | do | don't | do not | _ |
    c = | should | need | need to | will | will not | want | want to | _ |
    d = <verb>
    e = | it | to | _ |

    --> translate all combinations for `${a} ${b} ${c} ${d} ${e}`
    # of combinations = 8 * 4 * 8 * 3 = 768 combinations...  okay, let's try to prune these down a bit...

// this is just for present tense... what to do for other tenses?
144 -> <I|you|he|she|it|they> <should|will> <not|_> <need to|want to|_> <verb> <it|_>
144 -> <I|you|he|she|it|they> <could|can> <not|_> <verb> <it|_>
72  -> <I|you|they> <do|don't|do not|_> <need to|want to|_> <verb> <it|_>
72  -> <he|she|it> <does|doesn't|does not|_> <needs to|wants to|_> <verb> <it|_>
6   -> <I|you|they> <verb> <it|_>
6   -> <he|she|it> <verb><s> <it|_>
4   -> <to|_> <verb> <it|_>
= 304 combinations


when entering a <noun>, grab translations for all combinations of :
    a = | I am | you are | he is | she is | it is | they are | to be | _ |
    b = | am | are | is | be | ai |
    c = | not | ~n't | _ |
    c = | a | the | _ |
    d = <noun>
    e = | ~s | ~es | _ |

    --> translate all combinations for `${a} ${b} ${c} ${d} ${e}`
    # of combinations = 8 * 5 * 3 * 3 * 2 = 720 combinations...  okay, let's try to prune these down a bit...
    
4 -> I am <not|_> <a|the> <noun>
8 -> <you|they> are <not|_> <a|the> <noun>
12-> <she|he|it> is <not|_> <a|the> <noun>
4 -> they are <not|_> <noun><s|es>
48-> <I|you|she|he|it|they> <will|should> <not|_> <be> <a|the> <noun>
6 -> <they> <will|should> <not|_> <be> <noun><s|es>
2 -> to be <a|the> <noun>
2 -> to be <noun><s|es>
2 -> <a|the> <noun>
1 -> <noun>
2 -> <noun><s|es>
= 91 combinations


Refactor the dating sim to :
    
    - [ ] Read a text file
    - [ ] Count instances of each word
    - [ ] Sort words by greatest count to lowest count
    - [ ] Starting from the beginning of the array (greatest count), append any not-yet-learned-vocab to the new-vocab-buffer until the buffer is full, and flag them as newly-introduced-vocab
    - [ ] Grab and save translations for the newly appended vocabulary. 
    - [ ] Filter through the text document and replace any learned-vocab or newly-introduced-vocab with their translations.
        - [ ] For every translation, increase the confidence for that vocab word, but only as that word is scrolled past the top of the screen.
        - [ ] Attempt to predict vocab confidence down the page to reduce last minute changes during reading.
        - [ ] Should any 2 or more learned-vocab be adjacent to each other (without any punctuation in between them -- i.e. , . ; : - ( { [ / \ ~ etc... ), translate the vocabulary as a set, save the adjacent vocab as a new vocab-set entry and save its translation. 
            - [ ] Should any 2 or more learned-vocab be adjacent to each other, first search for it in the vocab-set entry. Else, create a new vocab-set entry
            - [ ] Once the number of entries in the vocab-sets reaches a sufficient size, attempt to extract sentence patterns from the data.
            - [ ] Should a sentence pattern be found, a generalized rule may be formed to simplify translations which match this pattern.
            - [ ] Patterns may also contain smaller patterns, and may also be a part of bigger patterns.
            - [ ] Should two patterns often be found adjacent, create a new pattern.
                - [ ] For new patterns, attempt to verify the pattern by generating new data by filling with random data from the expected set for each pattern variable, then evaluate and refine the pattern according to the discovered results.
            - [ ] Attempt to analyze differences between when patterns are translated individually and when they are translated separately

    - [ ] Add hover event to translated vocab, to display the original(native) translation of the individual vocab upon hovering the cursor over it.
        - [ ] Decrease the vocab confidence by .5 points and save time of last confidence decrease (time starts at hover exit). (Max decrease speed is 0.5 for every 10 seconds?).
    - [ ] Add click event to translated phrases (vocab-sets) to display the original phrase.
        - [ ] Decrease the phrase confidence the same way as the vocab confidence.
    - [ ] Add right click event pop-up to increase or decrease confidence levels for both vocab and phrases.
        - [ ] Also an input box to adjust the translation.
            - [ ] attempt to propagate the fix to other matching translations which use the same pattern & translation
    - [ ] 
```
