let API_KEY = "GOOGLE_TRANSLATE_API_KEY";

async function queryTranslation(from_lang, to_lang, text) {
  console.log(`translating '${text}'`);

  if (!text) {
    alert("the text box has no value");
    return;
  }

  if (!API_KEY) {
    API_KEY = prompt("Please enter your api key", "");
    if (API_KEY && API_KEY != null)
      saveVocab("key", API_KEY);
    else {
      API_KEY = undefined;
    }
  }

  if (!API_KEY || API_KEY == "GOOGLE_TRANSLATE_API_KEY") {
    alert("add your google translate api key to use google translate services");
  }
  if (API_KEY && API_KEY != null) {
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${from_lang}`;
    url += `&target=${to_lang}`;

    let res = await fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    let response = undefined;

    try {
      response = await res.json();
    } catch (e) {
      console.log("There was an error with the translation request: ", e);
    }

    let translation = response?.data?.translations[0]?.translatedText;

    if (typeof translation === "object") {
      alert(JSON.stringify(translation, null, 2));
      return "";
    } else if (!translation)
      return "";

    return translation.toLowerCase();
  }
}

// 5 conjugations
async function queryNounCombinations(from_lang, to_lang, noun) {
  let combinations = [];

  if (noun === "") {
    alert("nothing to translate!");
    return;
  }

  if (["a", "e", "i", "o", "u"].includes(noun[0]))
    for (let a of ["an ", "the ", ""]) 
      combinations.push(`${a}${noun}`);
  else
    for (let a of ["a ", "the ", ""])
      combinations.push(`${a}${noun}`);

  // plural
  for (let a of ["the ", ""])
    combinations.push(`${a}${noun}s`);


  let translations = [];
  for (let sentence of combinations) {
    translations.push(await queryTranslation(from_lang, to_lang, sentence));
  }

  let result = {
    sentences: combinations,
    translations: translations
  };

  return result;
}

// 30 conjugations
async function queryVerbCombinations(from_lang, to_lang, verb) {
  let combinations = [];
  
  for (let a of ["to ", ""])
    combinations.push(`${a}${verb}`);
  
  for (let a of ["I ", "you ", "they ", "we "])
    combinations.push(`${a}${verb}`);

  for (let a of ["he ", "she ", "it "])
    combinations.push(`${a}${verb}s`);

  for (let a of ["I ", "you ", "they ", "he ", "she ", "it ", "we "])
    for (let b of ["would ", "will ", "shall "])
      combinations.push(`${a}${b}${verb}`);


  let translations = [];
  for (let sentence of combinations) {
    translations.push(await queryTranslation(from_lang, to_lang, sentence));
  }

  let result = {
    sentences: combinations,
    translations: translations
  };

  return result;
}

// 8 conjugations
async function queryVerbCombinations_PastTense(from_lang, to_lang, verb) {
  let combinations = [];

  for (let a of ["I ", "you ", "they ", "he ", "she ", "it ", "we ", ""])
        combinations.push(`${a}${verb}`);

        
  let translations = [];
  for (let sentence of combinations) {
    translations.push(await queryTranslation(from_lang, to_lang, sentence));
  }

  let result = {
    sentences: combinations,
    translations: translations
  };

  return result;
}



// 30 conjugations
async function queryVerbCombinations_ToBe(from_lang, to_lang, verb) {
  let combinations = [];

  combinations.push(`I am ${verb}`);
  combinations.push(`I was ${verb}`);
  combinations.push(`I have been ${verb}`);
  
  for (let a of ["to be ", ""])
    combinations.push(`${a}${verb}`);
  
  for (let a of ["you ", "they ", "we "])
    for (let b of ["are ", "were ", "have been "])
        combinations.push(`${a} ${b} ${verb}`);

  for (let a of ["he ", "she ", "it "])
    for (let b of ["is ", "was ", "has been "])
        combinations.push(`${a} ${b} ${verb}s`);

  for (let a of ["I ", "you ", "they ", "he ", "she ", "it ", "we "])
    for (let b of ["will be "])
        combinations.push(`${a}${b}${verb}`);



  let translations = [];
  for (let sentence of combinations) {
    translations.push(await queryTranslation(from_lang, to_lang, sentence));
  }

  let result = {
    sentences: combinations,
    translations: translations
  };

  return result;
}




// this was the original function which has been pruned from 524 -> 68 conjugations
// This function also includes negatives, and many non trivial conjugations somone may wish to pick and pull at it, or simply use it outright
// 
// This code generates 500 complex sentences from a single verb input. i.e. "<call|run|break|...>" -> "you should not need to <call|run|break|...> it"
// but it's not perfect. it also generates a few grammatically incorrect sentences. i.e. "call" -> "he call" | "it need to call <it|...>";
// it can be fixed by breaking the patterns into (I, you, they) & (he, she, it) categories like I did to the smaller patterns above. 
// But since I don't plan on using this code, I don't feel any need to fix it... sorry. I'll review & merge any pull requests if anyone finds a need for it.
async function queryVerbCombinations_Comprehensive_PresentTense(from_lang, to_lang, verb) {
  let temp = verb.split(" ");
  if (temp.length != 1) {
    alert(`I cannot translate the verb '${verb}'`);
    return undefined;
  }

  // TODO : analyze patterns and remove redundancies to prune this number of combinations down.

  let combinations = [];
  // 144 -> 1: <I|you|he|she|it|they> <should|will> <not|_> <need to|want to|_> <verb> <it|_>
  for (let a of ["I ", "you ", "they ", "he ", "she ", "it "]) {
    for (let b of ["should ", "will "]) {
      for (let c of ["not ", ""]) {
        for (let d of ["need to ", "want to ", ""]) {
          for (let e of [" it", ""]) {
            combinations.push(`${a}${b}${c}${d}${verb}${e}`);
          }
        }
      }
    }
  }

  // 144 -> 2: <I|you|he|she|it|they> <could|can> <not|_> <verb> <it|_>
  for (let a of ["I ", "you ", "they ", "he ", "she ", "it "]) {
    for (let b of ["could ", "can "]) {
      for (let c of ["not ", ""]) {
        for (let d of [" it", ""]) {
          combinations.push(`${a}${b}${c}${verb}${d}`);
        }
      }
    }
  }

  // 72  -> 3: <I|you|they> <do|don't|do not|_> <need to|want to|_> <verb> <it|_>
  for (let a of ["I ", "you ", "they "]) {
    for (let b of ["do ", "don't ", "do not ", ""]) {
      for (let c of ["need to ", "want to ", ""]) {
        for (let d of [" it", ""]) {
          combinations.push(`${a}${b}${c}${verb}${d}`);
        }
        }
    }
  }
  
  // 72  -> 4: <he|she|it> <does|doesn't|does not> <need to|want to|_> <verb> <it|_>
  for (let a of ["he ", "she ", "it "]) {
    for (let b of ["does ", "doesn't ", "does not "]) {
      for (let c of ["need to ", "want to ", ""]) {
        for (let e of [" it", ""]) {
          combinations.push(`${a}${b}${c}${verb}${e}`);
        }
      }
    }
  }

  // 72  -> 5: <he|she|it>  <needs to|wants to|_> <verb> <it|_>
  for (let a of ["he ", "she ", "it "]) {
    for (let c of ["needs to ", "wants to ", ""]) {
      for (let e of [" it", ""]) {
        combinations.push(`${a}${c}${verb}${e}`);
      }
    }
  }

  // 6   -> 6: <I|you|they> <verb> <it|_>
  for (let a of ["I ", "you ", "they ", "he ", "she ", "it "]) {
    for (let e of [" it", ""]) {
      combinations.push(`${a}${verb}${e}`);
    }
  }

  // 6   -> 7: <he|she|it> <verb><s> <it|_>
  for (let a of ["he ", "she ", "it "]) {
    for (let e of [" it", ""]) {
      combinations.push(`${a}${verb}s${e}`);
    }
  }
  
  // 4   -> 8: <a|the> <verb> <it|_>
  for (let a of ["a ", "the "]) {
    for (let e of [" it", ""]) {
      combinations.push(`${a}${verb}${e}`);
    }
  }

  // 4   -> 9: <to|_> <verb> <it|_>
  for (let a of ["to ", ""]) {
    for (let e of [" it", ""]) {
      combinations.push(`${a}${verb}${e}`);
    }
  }

  let translations = [];
  for (let sentence of combinations) {
    translations.push(await queryTranslation(from_lang, to_lang, sentence));
  }

  let result = {
    sentences: combinations,
    translations: translations
  };

  return result;
}
