import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ResourceCard({ title, body, tags }: { title: string; body: string; tags: string[] }) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-ink/70">
        <p>{body}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
