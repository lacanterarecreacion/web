import * as Primitive from '@radix-ui/react-tooltip';

export function Tooltip() {
  return (
    <Primitive.Provider>
      <Primitive.Root>
        <Primitive.Trigger>
          <h1>Trigger</h1>
        </Primitive.Trigger>

        <Primitive.Portal>
          <Primitive.Content>
            Content
            <Primitive.Arrow />
          </Primitive.Content>
        </Primitive.Portal>
      </Primitive.Root>
    </Primitive.Provider>
  );
}
