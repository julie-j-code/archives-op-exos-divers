class Book{
  constructor(title, author, pages, description, currentPage){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.description=description;
    this.currentPage=1;
    this.read=false;  
}

  
  readBook(number){
    if(number===0||number>this.pages){
      alert("le nombre de pages indiqué n\'est pas valable");
    }else if(number==this.pages){
      this.read=true;
      alert("livre terminé");
    }else {
      this.currentPage=number;
		console.log(number);}
  }
  }

export { Book };
