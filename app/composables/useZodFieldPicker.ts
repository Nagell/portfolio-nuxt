import { z } from 'zod'

/**
 * Simple function that returns an object with a single method `pickField` that accepts a key from passed schema.
 * It supports you with auto-completion for input names and returns them as a string.
 *
 * @example
 * ```html
 *  <template>
 *    <input :name="pickField('countryProfessionTitle')"/>
 *    <!-- limitation: it doesn't work for nested fields -->
 *    <input :name="`legalProfessionalRegulations[${index}].link`"/>
 *  </template>
 *  <script setup lang="ts">
 *    import { useZodFieldPicker } from './useZodFieldPicker';
 *    import { someSchema } from './someSchema';
 *
 *    // someSchema is a Zod schema object (e.g. z.object({...}))
 *    const { pickField } = useZodFieldPicker(someSchema);
 *    // if working with refined schema from the API use sourceType method
 *    const { pickField } = useZodFieldPicker(refinedValidator.sourceType());
 *  </script>
 * ```
 */
export function useZodFieldPicker<T extends z.ZodObject<any>>(schema: T) {
  type Fields = z.infer<T>

  /** Function accepting a key from passed schema and returning it as a string. */
  function pickField<K extends keyof Fields>(field: K): string {
      return field as string
  }

  return { pickField }
}
