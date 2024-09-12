// checks if local command is different to existing command
export default function (existingCommand: any, localCommand: any) {
  // If existingChoices is different to localChoices, return true.
  const areChoicesDifferent = (existingChoices: any, localChoices: any) => {
    for (const localChoice of localChoices) {
      const existingChoice = existingChoices?.find(
        (choice: { name: any }) => choice.name === localChoice.name
      );

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
  const areOptionsDifferent = (existingOptions: any, localOptions: any) => {
    for (const localOption of localOptions) {
      const existingOption = existingOptions?.find(
        (option: any) => option.name === localOption.name
      );

      if (!existingOption) {
        return true;
      }

      if (
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (localOption.required || false) !== existingOption.required ||
        (localOption.choices?.length || 0) !==
          (existingOption.choices?.length || 0) ||
        areChoicesDifferent(
          localOption.choices || [],
          existingOption.choices || []
        )
      ) {
        return true;
      }
    }
    return false;
  };

  if (
    existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(existingCommand.options, localCommand.options || [])
  ) {
    return true;
  }

  return false;
}
