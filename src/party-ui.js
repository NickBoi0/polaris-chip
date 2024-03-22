import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {

  static get tag() {
    return 'party-ui';
  } 

  constructor() {
    super();
    this.players = [];
  }

  static get styles() {

    return css`

      :host {
        display: inline-flex;
      }

      .lightbg {
        background-color: var(--ddd-theme-default-beaver70);
        padding: 10px;
        margin: 100px;
        display: flex;

        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .darkbg {
        background-color: var(--ddd-theme-default-beaverBlue);
        padding: 150px 250px;
        bottom: -10px;
        margin-bottom: -20px;
      }

      .addchar {
        border: 3px dashed black;
        background-color: transparent;
        padding: 30px 30px;
        font-size: 50px;
      }

      .charlist {
        display: flex;
      }

      .chars {
        text-align: center;
      }

      .name {
        color: white;
        font-family: 'Orbitron';
      }

      .nameline {
        border-top: 3px solid #bbb;
        margin: 0px 20px;
      }
    `;
  }
  
  add(e) {

  }

  render() {
    return html`
        <div class="project1">
            <div class="lightbg">
                <div class="darkbg">
                    <div class="charlist">
                        <div class="chars">
                            <rpg-character hat="random" seed="yourchar"></rpg-character>
                            <div class="name">YOU</div>
                            <div class="nameline"></div>
                        </div>
                     <button @click="${this.add}" class="addchar">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  }

  static get properties() {
    return {
        players: { type: Array },
    };
  }s
}

globalThis.customElements.define(PartyUI.tag, PartyUI);
