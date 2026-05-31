import React from "react";
import { useListMedia, useCreateMedia, useUpdateMedia, useDeleteMedia, getListMediaQueryKey, getGetStatsQueryKey, getGetTopMediaQueryKey, getGetFavoritesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import type { MediaItem, MediaInput, MediaInputType, MediaInputStatus } from "@workspace/api-client-react/src/generated/api.schemas";

export default function Admin() {
  const { data: media, isLoading } = useListMedia();
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = React.useState<MediaItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: getListMediaQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetTopMediaQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetFavoritesQueryKey() });
  };

  const createMedia = useCreateMedia({ mutation: { onSuccess: () => { invalidateAll(); setIsDialogOpen(false); } } });
  const updateMedia = useUpdateMedia({ mutation: { onSuccess: () => { invalidateAll(); setIsDialogOpen(false); } } });
  const deleteMedia = useDeleteMedia({ mutation: { onSuccess: () => invalidateAll() } });

  const handleOpenEdit = (item: MediaItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteMedia.mutate({ id });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Vault Admin
          </h1>
          <p className="text-muted-foreground mt-2">Manage the media items in your vault.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreate} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Media' : 'Add New Media'}</DialogTitle>
            </DialogHeader>
            <MediaForm 
              item={editingItem} 
              onSubmit={(data) => {
                if (editingItem) {
                  updateMedia.mutate({ id: editingItem.id, data });
                } else {
                  createMedia.mutate({ data });
                }
              }}
              isSubmitting={createMedia.isPending || updateMedia.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : media?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No media items found.</div>
            ) : (
              media?.map(item => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    {item.poster ? (
                      <img src={item.poster} alt="" className="w-12 h-16 object-cover rounded-md bg-muted" />
                    ) : (
                      <div className="w-12 h-16 bg-muted rounded-md" />
                    )}
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground uppercase">{item.type} • {item.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleOpenEdit(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)} disabled={deleteMedia.isPending}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MediaForm({ item, onSubmit, isSubmitting }: { item: MediaItem | null, onSubmit: (data: MediaInput) => void, isSubmitting: boolean }) {
  const [formData, setFormData] = React.useState<MediaInput>({
    title: item?.title || "",
    type: item?.type || "anime",
    year: item?.year || new Date().getFullYear(),
    status: item?.status || "plan_to_watch",
    rating: item?.rating ?? undefined,
    poster: item?.poster || "",
    banner: item?.banner || "",
    synopsis: item?.synopsis || "",
    review: item?.review || "",
    isFavorite: item?.isFavorite || false,
    genres: item?.genres || [],
    episodes: item?.episodes ?? undefined,
    seasons: item?.seasons ?? undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title *</Label>
          <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Year *</Label>
          <Input type="number" required value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value, 10)})} />
        </div>
        <div className="space-y-2">
          <Label>Type *</Label>
          <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v as MediaInputType})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="series">Series</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Status *</Label>
          <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v as MediaInputStatus})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="watching">Watching</SelectItem>
              <SelectItem value="plan_to_watch">Plan to Watch</SelectItem>
              <SelectItem value="dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Rating (0-10)</Label>
          <Input type="number" step="0.1" min="0" max="10" value={formData.rating || ""} onChange={e => setFormData({...formData, rating: e.target.value ? parseFloat(e.target.value) : undefined})} />
        </div>
        <div className="flex items-center space-x-2 pt-8">
          <Switch checked={formData.isFavorite} onCheckedChange={checked => setFormData({...formData, isFavorite: checked})} />
          <Label>Favorite</Label>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Poster URL</Label>
          <Input value={formData.poster || ""} onChange={e => setFormData({...formData, poster: e.target.value})} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Banner URL</Label>
          <Input value={formData.banner || ""} onChange={e => setFormData({...formData, banner: e.target.value})} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Genres (comma separated)</Label>
          <Input value={formData.genres?.join(", ") || ""} onChange={e => setFormData({...formData, genres: e.target.value.split(",").map(g => g.trim()).filter(Boolean)})} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Synopsis</Label>
          <Textarea className="h-24" value={formData.synopsis || ""} onChange={e => setFormData({...formData, synopsis: e.target.value})} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Review</Label>
          <Textarea className="h-24" value={formData.review || ""} onChange={e => setFormData({...formData, review: e.target.value})} />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Media"}
        </Button>
      </DialogFooter>
    </form>
  );
}
