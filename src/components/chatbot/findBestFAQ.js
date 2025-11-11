// src/components/ChatBot/findBestFAQ.js

export default function findBestFAQ(userInput, faqs) {
  const input = userInput.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  faqs.forEach(faq => {
    const words = faq.question.split(" ");
    let score = 0;

    words.forEach(word => {
      if (input.includes(word)) {
        score += 1;
      }
    });

    const percentMatch = score / words.length;

    if (percentMatch > bestScore && percentMatch >= 0.4) {
      bestScore = percentMatch;
      bestMatch = faq;
    }
  });

  return bestMatch;
}
