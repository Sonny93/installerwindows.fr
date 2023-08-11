import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

import Footer from "components/Footer/Footer";
import CheckboxInput from "components/Form/CheckboxInput";
import FormField from "components/Form/FormField";
import GuideForm from "components/Form/GuideForm";
import Navbar from "components/Navbar/Navbar";

import { getGuides } from "lib/db";
import { redirectWithoutClientCache } from "utils/client";
import { deleteRequest } from "utils/request";

import styles from "./guide-delete.module.scss";

export default function GuideDelete({ guide }: { guide: Guide }) {
  const router = useRouter();

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [guideDeleted, setDeleted] = useState<boolean>(false);

  const handleDeleteGuide = async () => {
    setLoading(true);

    try {
      await deleteRequest(`/api/guide/${guide.slug}`);
      setDeleted(true);

      toast.success("Guide supprimé avec succès");
      redirectWithoutClientCache(router, "/guides");
    } catch (error: any) {
      console.warn(error);
      toast.error(
        error?.message ||
          "Une erreur est survenue lors de la suppression du guide"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["guide-delete"]}>
      <Navbar />
      <main>
        <h1>Supprimer un guide</h1>
        <GuideForm
          defaultValues={guide}
          onSubmit={handleDeleteGuide}
          canSubmit={confirmDelete}
          canEdit={false}
          isLoading={isLoading}
          isSubmitted={guideDeleted}
        >
          <FormField
            name="confirm-delete"
            label={`Confirmer la suppression de "${guide.title}"`}
            inline
            reverse
          >
            <CheckboxInput
              name="confirm-delete"
              onChange={({ checked }) => setConfirmDelete(checked)}
              checked={confirmDelete}
            />
          </FormField>
        </GuideForm>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const guideSlug = query.guideSlug?.[0] || "";
  const guide = (await getGuides()).find(({ slug }) => slug === guideSlug);
  if (!guide) {
    return { redirect: { destination: "/guides" } };
  }

  return {
    props: {
      guide,
    },
  };
}
