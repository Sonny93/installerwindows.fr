import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import CheckboxInput from "./CheckboxInput";
import FormField from "./FormField";
import Submit from "./Submit";

import {
  isGithubUrl,
  isGithubUserContentUrl,
  isImgurUrl,
  isStringEmpty,
  slugify,
  trimify,
} from "utils/string";
import TextInput from "./TextInput";

export default function GuideForm({
  defaultValues = {
    title: "",
    slug: "",
    thumbnail: "",
    github: {
      source: "",
      raw: "",
    },
    isDraft: false,
  },
  onSubmit,
  onValuesChange,
  canSubmit = true,
  canEdit = true,
  isLoading = false,
  isSubmitted = false,
  children,
}: {
  defaultValues?: GuideFormValues;
  onSubmit: (values: GuideFormValues) => void;
  onValuesChange?: (values: GuideFormValues) => void;
  canSubmit?: boolean;
  canEdit?: boolean;
  isLoading?: boolean;
  isSubmitted?: boolean;
  children?: ReactNode;
}) {
  const [title, setTitle] = useState<Guide["title"]>(defaultValues.title);
  const [slug, setSlug] = useState<Guide["slug"]>(defaultValues.slug);
  const [thumbnail, setThumbnail] = useState<Guide["thumbnail"]>(
    defaultValues.thumbnail
  );
  const [githubSource, setGithubSource] = useState<Guide["github"]["source"]>(
    defaultValues.github.source
  );
  const [githubRawSource, setGithubRawSource] = useState<
    Guide["github"]["raw"]
  >(defaultValues.github.raw);
  const [isDraft, setDraft] = useState<Guide["isDraft"]>(defaultValues.isDraft);

  const fieldsTrimed = useMemo<GuideFormValues>(
    () => ({
      title: trimify(title),
      slug: trimify(slug),
      thumbnail: trimify(thumbnail),
      github: {
        source: trimify(githubSource),
        raw: trimify(githubRawSource),
      },
      isDraft: isDraft,
    }),
    [githubRawSource, githubSource, isDraft, slug, thumbnail, title]
  );

  useEffect(() => onValuesChange && onValuesChange(fieldsTrimed));

  const canSubmitForm = useMemo<boolean>(() => {
    const {
      title: titleTrimed,
      slug: slugTrimed,
      thumbnail: thumbnailTrimed,
      github: { source: githubSourceTrimed, raw: githubRawSourceTrimed },
    } = fieldsTrimed;

    const isTitleOk = !isStringEmpty(titleTrimed);
    const isSlugOk = !isStringEmpty(slugTrimed);
    const isThumbnailSourceOk = !isStringEmpty(thumbnailTrimed)
      ? isImgurUrl(thumbnailTrimed)
      : true;
    const isGituhbSourceOk =
      !isStringEmpty(githubSourceTrimed) && isGithubUrl(githubSourceTrimed);
    const isGituhbSourceRawOk =
      !isStringEmpty(githubRawSourceTrimed) &&
      isGithubUserContentUrl(githubRawSourceTrimed);
    return (
      isTitleOk &&
      isSlugOk &&
      isThumbnailSourceOk &&
      isGituhbSourceOk &&
      isGituhbSourceRawOk &&
      canSubmit &&
      !isLoading &&
      !isSubmitted
    );
  }, [canSubmit, fieldsTrimed, isLoading, isSubmitted]);

  const checkBeforeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const titleTrimed = trimify(title);
      setTitle(titleTrimed);
      if (isStringEmpty(titleTrimed)) {
        throw new Error("Titre du guide manquant");
      }

      const slugTrimed = trimify(slug);
      if (isStringEmpty(slugTrimed)) {
        setSlug(slugify(titleTrimed));
      } else {
        setSlug(slugTrimed);
      }

      const thumbnailTrimed = trimify(thumbnail);
      setThumbnail(thumbnailTrimed);
      if (!isStringEmpty(thumbnail) && !isImgurUrl(thumbnailTrimed)) {
        throw new Error(
          "Un lien imgur est requis\n(ex: https://i.imgur.com/example.png)"
        );
      }

      const githubSourceTrimed = trimify(githubSource);
      setGithubSource(githubSourceTrimed);
      if (
        isStringEmpty(githubSourceTrimed) ||
        !isGithubUrl(githubSourceTrimed)
      ) {
        throw new Error(
          "Un lien Github est requis\n(ex: https://github.com/user/repo)"
        );
      }

      const githubRawSourceTrimed = trimify(githubRawSource);
      setGithubRawSource(githubRawSourceTrimed);
      if (
        isStringEmpty(githubRawSourceTrimed) ||
        !isGithubUserContentUrl(githubRawSourceTrimed)
      ) {
        throw new Error(
          "Un lien githubusercontent est requis\n(ex: https://raw.githubusercontent.com/user/repo/file)"
        );
      }

      onSubmit({
        title: titleTrimed,
        slug: slugTrimed,
        thumbnail: thumbnailTrimed,
        github: {
          source: githubSourceTrimed,
          raw: githubRawSourceTrimed,
        },
        isDraft,
      });
    } catch (error: any) {
      console.warn(error);
      toast.error(
        error?.message || "Une erreur est survenue lors de la création du guide"
      );
    }
  };

  return (
    <form onSubmit={checkBeforeSubmit}>
      <FormField label="Titre" name="title">
        <TextInput
          name="title"
          placeholder="Titre"
          value={title}
          onChange={({ value }) => setTitle(value)}
          onBlur={({ value }) => {
            if (trimify(slug) === "") {
              setSlug(slugify(value));
            }
          }}
          readOnly={!canEdit}
          disabled={isSubmitted}
        />
      </FormField>
      <FormField label={`Slug (ex: ${slugify("Mon super guide")})`} name="slug">
        <TextInput
          name="slug"
          placeholder={slugify("Mon super guide")}
          value={slug}
          onChange={({ value }) => setSlug(value)}
          onBlur={({ value }) => setSlug(slugify(value))}
          readOnly={!canEdit}
          disabled={isSubmitted}
        />
      </FormField>
      <FormField label="Miniature (optionnel)" name="thumbnail">
        <TextInput
          name="thumbnail"
          placeholder="Lien miniature"
          value={thumbnail}
          onChange={({ value }) => setThumbnail(value)}
          readOnly={!canEdit}
          disabled={isSubmitted}
        />
      </FormField>
      <FormField label="Source Github" name="github-source">
        <TextInput
          name="github-source"
          placeholder="Lien Github"
          value={githubSource}
          onChange={({ value }) => setGithubSource(value)}
          readOnly={!canEdit}
          disabled={isSubmitted}
        />
      </FormField>
      <FormField label="Source Github Raw" name="github-source-raw">
        <TextInput
          name="github-source-raw"
          placeholder="Lien vers le fichier brut (raw)"
          value={githubRawSource}
          onChange={({ value }) => setGithubRawSource(value)}
          readOnly={!canEdit}
          disabled={isSubmitted}
        />
      </FormField>
      <FormField label="Brouillon" name="is-draft" inline reverse>
        <CheckboxInput
          name="is-draft"
          checked={isDraft}
          onChange={({ checked }) => setDraft(checked)}
          readOnly={!canEdit}
          disabled={isSubmitted}
        />
      </FormField>
      {children && children}
      <FormField name="submit-form">
        <Submit label="Valider" disabled={!canSubmitForm} />
      </FormField>
    </form>
  );
}
