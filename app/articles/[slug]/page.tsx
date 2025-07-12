type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    dk?: string;
  };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const data = await getDetail(params.slug, {
    draftKey: searchParams?.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url || ''],
    },
    alternates: {
      canonical: `/articles/${params.slug}`,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const data = await getDetail(params.slug, {
    draftKey: searchParams?.dk,
  });

  return <Article data={data} />;
}
