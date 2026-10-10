"use client";

import { Checkbox } from "@nest-arch-web/ui/components/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@nest-arch-web/ui/components/field";
import {
  RadioGroup,
  RadioGroupItem,
} from "@nest-arch-web/ui/components/radio-group";
import { cn } from "@nest-arch-web/ui/lib/utils";

import { TechnologyIcon } from "@/components/technology-icon";

export interface BuilderOption {
  value: string;
  label: string;
  description: string;
  disabledReason?: string;
}

interface BuilderOptionsProps {
  id: string;
  title: string;
  hint: string;
  notice?: string;
  options: BuilderOption[];
  selected: string[];
  multiple?: boolean;
  onChange: (values: string[]) => void;
}

const OptionCard = ({
  id,
  option,
  selected,
  multiple,
  onToggle,
  notice,
}: {
  id: string;
  option: BuilderOption;
  selected: boolean;
  multiple: boolean;
  onToggle: (checked: boolean) => void;
  notice?: string;
}) => (
  <FieldLabel
    htmlFor={id}
    className={cn(
      "builder-option h-full min-w-0 cursor-pointer",
      option.disabledReason && "cursor-not-allowed"
    )}
    data-selected={selected}
  >
    <Field
      orientation="horizontal"
      data-disabled={Boolean(option.disabledReason)}
      className="min-h-24 gap-4 p-4!"
    >
      <FieldContent className="min-w-0 [overflow-wrap:anywhere]">
        <FieldTitle className="max-w-full">
          {option.value !== "none" && option.value !== "no" && (
            <TechnologyIcon
              value={option.value}
              section={id.slice(0, id.lastIndexOf("-"))}
            />
          )}
          <span className="font-mono font-semibold">{option.label}</span>
        </FieldTitle>
        <FieldDescription className="mt-2!">
          {option.description}
        </FieldDescription>
        {option.disabledReason && option.disabledReason !== notice && (
          <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
            {option.disabledReason}
          </p>
        )}
      </FieldContent>
      {multiple ? (
        <Checkbox
          aria-label={option.label}
          id={id}
          checked={selected}
          disabled={Boolean(option.disabledReason)}
          onCheckedChange={onToggle}
          aria-describedby={`${id}-description`}
        />
      ) : (
        <RadioGroupItem
          aria-label={option.label}
          id={id}
          value={option.value}
          disabled={Boolean(option.disabledReason)}
          aria-describedby={`${id}-description`}
        />
      )}
      <span id={`${id}-description`} className="sr-only">
        {option.disabledReason ?? option.description}
      </span>
    </Field>
  </FieldLabel>
);

export const BuilderOptions = ({
  id,
  title,
  hint,
  notice,
  options,
  selected,
  multiple = false,
  onChange,
}: BuilderOptionsProps) => {
  const cards = options.map((option) => (
    <OptionCard
      key={option.value}
      id={`${id}-${option.value}`}
      option={option}
      selected={selected.includes(option.value)}
      multiple={multiple}
      notice={notice}
      onToggle={(checked) =>
        onChange(
          checked
            ? [...selected, option.value]
            : selected.filter((value) => value !== option.value)
        )
      }
    />
  ));

  return (
    <FieldSet
      id={id}
      aria-describedby={notice ? `${id}-notice` : undefined}
      className="min-w-0 scroll-mt-36 gap-3 border-b pb-8 last:border-0"
    >
      <FieldLegend className="mb-4 flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="font-mono tracking-wide uppercase">{title}</span>
        <span className="text-muted-foreground text-xs font-normal">
          {hint}
        </span>
      </FieldLegend>
      {notice && (
        <p
          className="text-muted-foreground mb-1 text-xs leading-relaxed"
          id={`${id}-notice`}
        >
          {notice}
        </p>
      )}
      {multiple ? (
        <FieldGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cards}
        </FieldGroup>
      ) : (
        <RadioGroup
          aria-label={title}
          value={selected[0] ?? "none"}
          onValueChange={(value) => {
            if (typeof value === "string") {
              onChange([value]);
            }
          }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {cards}
        </RadioGroup>
      )}
    </FieldSet>
  );
};
