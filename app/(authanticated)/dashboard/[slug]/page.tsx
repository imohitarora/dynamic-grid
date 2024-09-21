import UserDetailsForm from "@/components/user-details";

export default function EditPage({ params }: { params: { slug: string } }) {
  const slugNumber = parseInt(params.slug);
  if (isNaN(slugNumber)) {
    return <div>Invalid user ID</div>;
  }
  return (
    <div>
      <UserDetailsForm userId={parseInt(params.slug)} />
    </div>
  );
}
