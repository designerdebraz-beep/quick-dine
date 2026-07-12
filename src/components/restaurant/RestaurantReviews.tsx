/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useAppContext } from "../../context/AppContext.js";
import { getReviewsBySlug, createReview } from "../../lib/reviews.js";

interface RestaurantReviewsProps {
    restaurant: any;
}

export default function RestaurantReviews({ restaurant }: RestaurantReviewsProps) {
    const { isAuthenticated, token } = useAppContext();
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const load = async () => {
        try {
            const data = await getReviewsBySlug(restaurant.slug);
            setReviews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (restaurant?.slug) load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurant?.slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        try {
            setSubmitting(true);
            const review = await createReview(
                { restaurantId: restaurant._id, rating, comment },
                token as string
            );
            setReviews((prev) => [review, ...prev]);
            setComment("");
            setRating(5);
        } catch (error: any) {
            console.error(error?.response?.data?.message || error?.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="space-y-8 pt-6 border-t border-outline-variant/10 text-left">
            <h3 className="font-display text-xl font-semibold text-primary">Guest Experiences</h3>

            {isAuthenticated && (
                <form
                    onSubmit={handleSubmit}
                    className="bg-surface-container-low/40 border border-outline-variant/20 rounded-md p-5 space-y-3"
                >
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button type="button" key={n} onClick={() => setRating(n)}>
                                <Star
                                    size={20}
                                    fill={n <= rating ? "currentColor" : "none"}
                                    className={n <= rating ? "text-secondary" : "text-outline-variant"}
                                />
                            </button>
                        ))}
                        <span className="text-xs text-black/55 ml-2">{rating}/5</span>
                    </div>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Share your experience..."
                        className="w-full bg-white border border-outline-variant/40 rounded-md p-3 text-xs focus:border-secondary focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-primary hover:bg-secondary text-white text-xs font-medium tracking-widest uppercase px-6 py-2.5 rounded-sm cursor-pointer disabled:opacity-70"
                    >
                        {submitting ? "POSTING..." : "SUBMIT REVIEW"}
                    </button>
                </form>
            )}

            <div className="space-y-6">
                {loading ? (
                    <div className="w-6 h-6 border-2 border-outline-variant/30 border-t-secondary rounded-full animate-spin"></div>
                ) : reviews.length === 0 ? (
                    <p className="text-xs text-black/55/80 italic">
                        No reviews yet. Be the first to share your experience!
                    </p>
                ) : (
                    reviews.map((r: any) => (
                        <div
                            key={r._id}
                            className="pb-6 border-b border-outline-variant/10 last:border-b-0 space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-medium text-primary">{r.userName}</h4>
                                    <span className="text-xs text-black/55">
                                        Visited {new Date(r.visitedDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-0.5 text-secondary">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            fill={i < r.rating ? "currentColor" : "none"}
                                            className={i < r.rating ? "" : "text-outline-variant"}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-black/55 max-w-lg leading-relaxed">{r.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
