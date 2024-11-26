drop policy " Enable read access for all users 1jusbtc_0" on "storage"."objects";

drop policy "Enable all for authenticated users only 1jusbtc_0" on "storage"."objects";

drop policy "Enable all for authenticated users only 1jusbtc_1" on "storage"."objects";

drop policy "Enable all for authenticated users only 1jusbtc_2" on "storage"."objects";

drop policy "Enable all for authenticated users only 1jusbtc_3" on "storage"."objects";

create policy "Enable all for authenticated users only 1bqp9qb_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'assets'::text));


create policy "Enable all for authenticated users only 1bqp9qb_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'assets'::text));


create policy "Enable all for authenticated users only 1bqp9qb_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'assets'::text));


create policy "Enable all for authenticated users only 1bqp9qb_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'assets'::text));


create policy "Enable read access for all users 1bqp9qb_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'assets'::text));



