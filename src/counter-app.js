import { LitElement, html, css } from 'lit';


export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  } 

  constructor() {
    super();
    this.counter = 15;
    this.min = 10;
    this.max = 25;
  }

  static get styles() {

    return css`

      :host {
        display: block;
      }
      :host([counter="20"]) .header {
        color: red;
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .card {
        background-color: cyan;
        padding: 16px;
        margin: 32px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .header {
        font-size: 50px;
        color: black;
        text-align: center;
      }

      .buttonRow {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      
      .addBtn,
      .subtractBtn {
        background-color: blue;
        color: white;
        text-align: center;
        padding: 20px;
        transition: .6s all ease-in-out;
        margin: 16px 16px 16px 16px;
      }

      .addBtn:focus,
      .addBtn:hover,
      .subtractBtn:focus,
      .subtractBtn:hover {
        background-color: darkblue;
      }

    `;
  }

  addOne(e) {
    
    this.counter+=1;
    
  }

  render() {

    return html`
      <div class="wrapper">
          <div class="card">
            <div class="header">
              <header>${this.counter}</header>
            </div>
            <div class="buttonRow">
              <button @click="${this.addOne}" class="subtractBtn">-</button>
              <button class="addBtn">+</button>
            </div>
          </div>
      </div>
    `;
  }

  static get properties() {
    return {
        counter: { type: Number, reflect: true },
        min: {type: Number, reflect: true },
        max: {type: Number, reflect: true },
    };
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
