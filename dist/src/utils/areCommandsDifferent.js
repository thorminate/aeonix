"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// checks if local command is different to existing command
module.exports = (existingCommand, localCommand) => {
    var _a, _b;
    // If existingChoices is different to localChoices, return true.
    const areChoicesDifferent = (existingChoices, localChoices) => {
        for (const localChoice of localChoices) {
            const existingChoice = existingChoices === null || existingChoices === void 0 ? void 0 : existingChoices.find((choice) => choice.name === localChoice.name);
            if (!existingChoice) {
                return true;
            }
            if (localChoice.value !== existingChoice.value) {
                return true;
            }
        }
        return false;
    };
    // If existingOptions is different to localOptions, return true.
    const areOptionsDifferent = (existingOptions, localOptions) => {
        var _a, _b;
        for (const localOption of localOptions) {
            const existingOption = existingOptions === null || existingOptions === void 0 ? void 0 : existingOptions.find((option) => option.name === localOption.name);
            if (!existingOption) {
                return true;
            }
            if (localOption.description !== existingOption.description ||
                localOption.type !== existingOption.type ||
                (localOption.required || false) !== existingOption.required ||
                (((_a = localOption.choices) === null || _a === void 0 ? void 0 : _a.length) || 0) !==
                    (((_b = existingOption.choices) === null || _b === void 0 ? void 0 : _b.length) || 0) ||
                areChoicesDifferent(localOption.choices || [], existingOption.choices || [])) {
                return true;
            }
        }
        return false;
    };
    if (existingCommand.description !== localCommand.description ||
        ((_a = existingCommand.options) === null || _a === void 0 ? void 0 : _a.length) !== (((_b = localCommand.options) === null || _b === void 0 ? void 0 : _b.length) || 0) ||
        areOptionsDifferent(existingCommand.options, localCommand.options || [])) {
        return true;
    }
    return false;
};
