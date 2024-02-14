import { LitElement, html, css } from 'lit';


export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  } 

  constructor() {
    super();
    this.counter = 17;
    this.min = 10;
    this.max = 30;
  }

  static get styles() {

    return css`

      :host {

        display: block;
      }

      .card {
        width: 500px;
        height: 500px;
        border: 3px solid black;
      }

    `;
  }

  render() {

    return html`
        <div class="wrapper">
            <div class="card">

            </div>
        </div>
    `;
  }

  static get properties() {
    return {
        counter: { type: int },
        min: {type: int},
        max: {type: int},
    };
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);
