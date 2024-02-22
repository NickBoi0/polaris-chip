import { LitElement, html, css } from 'lit';

export class AlertMessage extends LitElement {

  static get tag() {
    return 'alert-message';
  } 

  constructor() {
    super();

  }

  static get styles() {
    return css`

      :host {
        display: inline-flex;
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .banner {
        background-color: lightcoral;
        padding: 20px 100% 20px 20px;
        top: 0;
        position: fixed;
        //position: absolute;
        align-items: center;
      }

      .header {
        font-size: 50px;
        color: black;
        text-align: center;
        font-weight: bold;
      }

    `;
  }

  render() {
    return html`   
        <div class="wrapper">
            <div class="banner">
                <div class="header">
                    <header>Campus Alert Dialog</header>
                </div>
            </div>
        </div>
    `;
  }

  static get properties() {
    return {

    };
  }
}

globalThis.customElements.define(AlertMessage.tag, AlertMessage);
