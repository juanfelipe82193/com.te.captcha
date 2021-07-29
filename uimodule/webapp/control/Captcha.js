/* eslint-disable no-trailing-spaces */
sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/Label",
    "com/te/captcha/resources/libs/lodash"
], function (Control,
    Input,
    Button,
    Label,
    lodash) {
    "use strict";

    return Control.extend("com.te.captcha.control.Captcha", {

        metadata: {
            properties: {
                heading: { type: "string" },
                value: { type: "string" }
            },
            aggregations: {
                _label: { type: "sap.m.Label", multiple: false, visibility: "hidden" },
                _input: { type: "sap.m.Input", multiple: false, visibility: "hidden" },
                _refresh: { type: "sap.m.Button", multiple: true, visibility: "hidden" },
                _submit: { type: "sap.m.Button", multiple: false, visibility: "hidden" },
            },
            events: {
                valid: {
                    parameters: {
                        value: {
                            type: "string"
                        }
                    }
                }
            }
        },
        init: function () {
            this.setAggregation("_input", new Input({ value: "abcdef" }).addStyleClass("sapUiSmallMargin"));
            this.setAggregation("_label", new Label({ text: this.getValue() }).addStyleClass("sapUiSmallMargin"));
            this.addAggregation("_refresh", new Button({
                type: "Accept",
                text: "Refresh",
                press: this._onRefresh.bind(this)
            }).addStyleClass("sapUiSmallMargin"));
            this.addAggregation("_refresh", new Button({
                type: "Accept",
                text: "Refresh1",
                press: this._onRefresh.bind(this)
            }).addStyleClass("sapUiSmallMargin"));
            this.setAggregation("_submit", new Button({
                type: "Reject",
                text: "Submit",
                press: this._onSubmit.bind(this)
            }).addStyleClass("sapUiSmallMargin"));
        },

        _onRefresh: function () {
            var sValue = this.getValue();
            this.getAggregation("_label").setText(sValue);
        },

        getValue: function () {
            var sValue = _.sampleSize([
                "A", "B", "C", "D", "F", "G", "H", "I", "J", "K",
                0, 1, 2, 3, 4, 5, 6, 7
            ], 5).join("");
            this.setProperty("value", sValue, true);
            return sValue;
        },

        _onSubmit: function () {
            if (this.getAggregation("_input").getValue() === this.getProperty("value")) {
                this.fireEvent("valid", { value: this.getProperty("value") }, false);
            } else {
                alert("Do not match");
            }
        },

        renderer: function (oRM, oControl) {
            oRM.openStart("div", oControl);
            oRM.class("captcha");
            oRM.openEnd();
            oRM.write(`<div>${oControl.getHeading()}</div>`);
            oRM.renderControl(oControl.getAggregation("_label"));
            oRM.renderControl(oControl.getAggregation("_input"));
            oRM.renderControl(oControl.getAggregation("_refresh")[0]);
            oRM.renderControl(oControl.getAggregation("_refresh")[1]);
            oRM.renderControl(oControl.getAggregation("_submit"));
            oRM.close("div");
        }
    });
});