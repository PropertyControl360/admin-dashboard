

export function paramCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function snakeCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

export function titleCase(str: string) {
  const words = str?.toLowerCase()?.split(' ');
  const countries = new Set(["UK", "USA", "USSR", "UAE", "EU"]); // Add more countries as needed

  for (let i = 0; i < words?.length; i += 1) {
    if (countries.has(words[i].toUpperCase())) {
      words[i] = words[i].toUpperCase();
    } else {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }

  return words?.join(' ');
}
export function titleCaseAllCaps(str: string) {
  const words = str.toUpperCase()?.split(' ');
  for (let i = 0; i < words.length; i += 1) {
    words[i] = words[i].toUpperCase();
  }
  return words.join(' ');
}

export function titleSentences(description : string) {
  const sentences = description.match(/[^.!?]+[.!?]?/g);
  console.log(sentences)

  const countries = new Set(["UK", "USA", "USSR", "UAE", "EU"]); 
  if (!sentences) return description; 
  
  for (let i = 0; i < sentences.length; i+=1) {
    const sentence = sentences[i].trim();
    const words = sentence.split(' ');
    console.log(words)

    for (let j = 0; j < words.length; j+=1) {
      const word = words[j];
      if (countries.has(word.toUpperCase())) {
        words[j] = word.toUpperCase();
      } else if (word === word.toUpperCase()) {

        words[j] = word.charAt(0) + word.slice(1).toLowerCase();
      } else if (j===0) {
        words[j] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    }

    sentences[i] = words.join(' ');
  }

  return sentences.join(' '); 
}


export function extractExtension(url: string): string {
  const splitUrl = url?.split('.');
  const extensionWithParams = splitUrl[splitUrl.length - 1];
  const extension = extensionWithParams?.split('?')[0];
  return extension;
}

export function extractFileNameWithoutExtension(encodedFileName: string): string {
  const decodedFileName = decodeURIComponent(encodedFileName);
  const fileNameWithExtension = decodedFileName?.split('/').pop() || ''; // Extract filename with extension
  return fileNameWithExtension?.split('.').slice(0, -1).join('.'); // Extract filename without extension
}
export function generatePropertySummary(property: any) {
  const { bedrooms, bathrooms, features } = property;
  let summary = '';

  summary += `This property has ${bedrooms} bedroom(s) and ${bathrooms} bathroom(s)`;
  
  if (features) {
      
      if (summary.length > 0) {
          summary += ', ';
      }
      summary += features;
  }

  if (summary.length === 0) {
      summary = 'No additional features';
  }

  return summary;
}
