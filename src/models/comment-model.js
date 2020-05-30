class CommentModel {
  constructor(comment) {
    this.id = comment.id;
    this.text = comment.text;
    this.emoji = comment.emoji;
    this.date = comment.date;
    this.author = comment.author;
  }

  getComment() {
    return {
      id: this.id,
      text: this.text,
      emoji: this.emoji,
      date: this.date,
      author: this.author,
    };
  }
}

export {CommentModel};
