"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EditRegistrationDialog } from "@/components/edit-registration-dialog";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type Registration = {
  id: string;
  pangalan: string;
  palayaw: string;
  edad: string;
  kasarian: string;
  contactNumber: string;
  localChurch: string;
  kasapian: string;
  ilangBeses: string;
  mgaInaasahan: string;
};

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const fetchRegistrations = async () => {
    try {
      const q = query(collection(db, "registrations"), orderBy("pangalan"));
      const querySnapshot = await getDocs(q);
      const data: Registration[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Registration);
      });
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSaveEdit = async (id: string, data: Omit<Registration, "id">) => {
    try {
      await updateDoc(doc(db, "registrations", id), data);
      toast({
        title: "Success",
        description: "Registration updated successfully!",
      });
      fetchRegistrations();
    } catch (error) {
      console.error("Error updating:", error);
      toast({
        title: "Error",
        description: "Failed to update registration.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "registrations", id));
      toast({
        title: "Success",
        description: "Registration deleted successfully!",
      });
      fetchRegistrations();
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting:", error);
      toast({
        title: "Error",
        description: "Failed to delete registration.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Officer Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {user.email}</p>
        </div>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Baptized Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations.filter(r => r.kasapian === "Baptized").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Professing Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {registrations.filter(r => r.kasapian === "Professing").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
          <CardDescription>
            List of all registered participants for Christmas Institute 2025
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingData ? (
            <p>Loading registrations...</p>
          ) : registrations.length === 0 ? (
            <p className="text-muted-foreground">No registrations yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Pangalan</th>
                    <th className="text-left p-2">Palayaw</th>
                    <th className="text-left p-2">Edad</th>
                    <th className="text-left p-2">Kasarian</th>
                    <th className="text-left p-2">Contact</th>
                    <th className="text-left p-2">Local Church</th>
                    <th className="text-left p-2">Kasapian</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{reg.pangalan}</td>
                      <td className="p-2">{reg.palayaw}</td>
                      <td className="p-2">{reg.edad}</td>
                      <td className="p-2">{reg.kasarian}</td>
                      <td className="p-2">{reg.contactNumber}</td>
                      <td className="p-2">{reg.localChurch}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          reg.kasapian === "Baptized" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {reg.kasapian}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingRegistration(reg)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeletingId(reg.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <EditRegistrationDialog
        registration={editingRegistration}
        open={!!editingRegistration}
        onOpenChange={(open) => !open && setEditingRegistration(null)}
        onSave={handleSaveEdit}
      />

      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the registration.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
