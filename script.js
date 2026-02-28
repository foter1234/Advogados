            document.querySelectorAll('[data-reviews-carousel]').forEach((carousel) => {
                const track = carousel.querySelector('[data-reviews-track]');
                const cards = Array.from(track.querySelectorAll('.review-card'));
                const prevButton = carousel.querySelector('.review-arrow-prev');
                const nextButton = carousel.querySelector('.review-arrow-next');
                let index = 0;
                const hasNavigation = cards.length > 2;

                const update = () => {
                    track.style.transform = `translateX(-${index * 100}%)`;
                    prevButton.disabled = index === 0;
                    nextButton.disabled = index === cards.length - 1;
                };

                if (!hasNavigation) {
                    prevButton.classList.add('review-arrow-hidden');
                    nextButton.classList.add('review-arrow-hidden');
                }

                prevButton.addEventListener('click', () => {
                    if (!hasNavigation) return;
                    index = Math.max(0, index - 1);
                    update();
                });

                nextButton.addEventListener('click', () => {
                    if (!hasNavigation) return;
                    index = Math.min(cards.length - 1, index + 1);
                    update();
                });

                update();
            });