export default async function Page() {
  const data = await fetch('http://localhost:8080/api/jobs');
  const jobs = await data.json();
  return (
    <ul>
      {jobs.map((job: any) => (
        <li key={job.id}>{job.title}</li>
      ))}
    </ul>
  );
}
