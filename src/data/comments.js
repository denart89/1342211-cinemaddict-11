const generateComments = () => {
  return [
    {
      text: `Interesting setting and a good cast`,
      emoji: `smile`,
      date: `Today`,
      author: `Denis Russkikh`,
    },
    {
      text: `Booooooooooring`,
      emoji: `sleeping`,
      date: `Today`,
      author: `Denis Russkikh`,
    },
    {
      text: `Very very old. Meh`,
      emoji: `puke`,
      date: `Today`,
      author: `Denis Russkikh`,
    },
    {
      text: `Almost two hours? Seriously?`,
      emoji: `angry`,
      date: `Today`,
      author: `Denis Russkikh`,
    },
  ];
};

const getCommentsCount = () => {
  return generateComments().length;
};

export {generateComments, getCommentsCount};
