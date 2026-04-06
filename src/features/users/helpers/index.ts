import { createListSearchString, parseListSearchState } from "@shared/helpers";
import type { ListSearchState } from "@shared/types";

export const buildUsersSearchValue = (
  firstName: string,
  lastName: string,
): string => [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");

export const getUsersNameSearchParams = (search: string) => {
  const parts = search
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0] ?? "", lastName: "" };
  }

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
};

export const parseUsersSearchState = (
  params: URLSearchParams,
): ListSearchState => {
  const firstName = params.get("firstName")?.trim() ?? "";
  const lastName = params.get("lastName")?.trim() ?? "";

  return {
    ...parseListSearchState(params),
    search: buildUsersSearchValue(firstName, lastName),
  };
};

export const createUsersSearchString = ({
  search,
  ...listState
}: ListSearchState) => {
  const params = new URLSearchParams(
    createListSearchString({ ...listState, search: "" }),
  );
  const { firstName, lastName } = getUsersNameSearchParams(search);

  if (firstName) {
    params.set("firstName", firstName);
  }

  if (lastName) {
    params.set("lastName", lastName);
  }

  return params.toString();
};
