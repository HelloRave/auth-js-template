import { signIn, signOut } from "@/auth";

export default function Home() {
  return (
    <div>
      <h1>Hello world</h1>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button>Google</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <button>Github</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn();
        }}
      >
        <button>Credentials</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button>Sign out</button>
      </form>
    </div>
  );
}
