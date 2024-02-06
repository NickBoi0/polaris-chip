import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super(); 

    this.title = "My card!";
    this.link = "#";
    this.desc = "";
    this.btnText = "";
    this.img = "";
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .controlBtns {
        margin: 32px 16px;
      }

      .duplicate,
      .delete,
      .changeimg,
      .changebg,
      .changeheading {
        background-color: darkblue;
        color: white;
        text-align: center;
        padding: 15px;
        transition: .6s all ease-in-out;
        border: 3px solid black;
      }

      .duplicate:focus,
      .duplicate:hover,
      .delete:focus,
      .delete:hover,
      .changeimg:focus,
      .changeimg:hover,
      .changebg:focus,
      .changebg:hover,
      .changeheading:focus,
      .changeheading:hover {
        background-color: blue;
      }

      .hw2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .card {
        width: 400px;
        height: 500px;
        background-color: gray;
        padding: 16px;
        margin: 32px 16px;
        border-radius: 6px;
        border: 3px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .header {
        font-size: 50px;
        color: Blue;
      }

      .img {
        padding: 3px;
      }

      .paragraph {
        padding: 5px 0;
        font-weight: bold;
        font-size: 20px;
        margin: 30px;
      }

      .btn {
        background-color: blue;
        color: white;
        text-align: center;
        padding: 15px;
        transition: .6s all ease-in-out;
        border: 3px solid black;
      }

      .btn:focus,
      .btn:hover {
        background-color: darkblue;
      }

      @media all and (min-width: 500px) and (max-width: 800px) {
        .card button {
          display: flex;
        }
      }

      @media all and (max-width: 500px) {
        .card {
          max-width: 200px;
          padding: 16px;
          font-size: 10px;
        }
        .card .paragraph {
          font-size: 12px;
        }
      }
    `;
  }

render() {
  return html`

    <div class="hw2">
      <div class="card"> 
        <div class="header">
          <header>${this.title}</header>
        </div>

        <img class="img" src="${this.img}" alt="${this.title}" width="200px">

        <div class="paragraph">${this.desc}</div>
        <a href="${this.link}">
          <button class="btn">${this.btnText}</button>
        </a>
      </div>
    </div>
  `;
}

static get properties() {
  return {
    title: { type: String },
    link: { type: String},
    desc: { type: String},
    img: { type: String},
    btnText: { type: String},
  };
}
}


globalThis.customElements.define(MyCard.tag, MyCard);
