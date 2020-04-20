const generateSort = () => {
  return [
    {
      title: `Sort by default`,
      hash: `default`,
      isActive: true,
    },
    {
      title: `Sort by date`,
      hash: `date`,
    },
    {
      title: `ort by rating`,
      hash: `rating`,
    },
  ];
};

export {generateSort};
